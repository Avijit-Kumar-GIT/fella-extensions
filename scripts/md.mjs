// Tiny Markdown -> sanitized HTML renderer. No dependencies. Deliberately
// small: headings, paragraphs, bold/italic, inline + fenced code, unordered
// and ordered lists, blockquotes, links, horizontal rules. Everything is
// HTML-escaped first, so raw HTML in the source is shown as text, never run.
// Output is safe to inject with innerHTML.

const NUL = String.fromCharCode(0xE000); // private-use sentinel

const esc = (s) =>
	s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Inline: code spans, bold, italic, links. Input is already HTML-escaped. */
function inline(s) {
	// Pull `code` spans out first so nothing else touches their contents.
	const codes = [];
	s = s.replace(/`([^`]+)`/g, (_, c) => {
		codes.push(c);
		return `${NUL}${codes.length - 1}${NUL}`;
	});
	s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
	// [text](http(s)://url) http(s) only; nothing else becomes a link.
	s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, t, u) => {
		const safe = u.replace(/"/g, '&quot;');
		return `<a href="${safe}" rel="noopener noreferrer">${t}</a>`;
	});
	s = s.replace(new RegExp(`${NUL}(\\d+)${NUL}`, 'g'), (_, i) => `<code>${codes[+i]}</code>`);
	return s;
}

export function renderMarkdown(src) {
	const lines = String(src).replace(/\r\n?/g, '\n').split('\n');
	const out = [];
	let i = 0;

	const emitList = (buf, ordered) => {
		if (!buf.length) return;
		const tag = ordered ? 'ol' : 'ul';
		out.push(`<${tag}>` + buf.map((li) => `<li>${inline(esc(li))}</li>`).join('') + `</${tag}>`);
		buf.length = 0;
	};

	while (i < lines.length) {
		const line = lines[i];

		const fence = line.match(/^```[\w-]*\s*$/);
		if (fence) {
			const body = [];
			i++;
			while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
			i++;
			out.push(`<pre><code>${esc(body.join('\n'))}\n</code></pre>`);
			continue;
		}

		const h = line.match(/^(#{1,4})\s+(.*)$/);
		if (h) {
			out.push(`<h${h[1].length}>${inline(esc(h[2].trim()))}</h${h[1].length}>`);
			i++;
			continue;
		}

		if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
			out.push('<hr />');
			i++;
			continue;
		}

		if (/^>\s?/.test(line)) {
			const buf = [];
			while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
			out.push(`<blockquote>${inline(esc(buf.join(' ').trim()))}</blockquote>`);
			continue;
		}

		const uMark = /^\s*[-*+]\s+/;
		const oMark = /^\s*\d+[.)]\s+/;
		const startsBlock = (l) =>
			l.trim() === '' ||
			/^(#{1,4}\s|```|>\s?|(-{3,}|\*{3,}|_{3,})\s*$)/.test(l) ||
			uMark.test(l) ||
			oMark.test(l);
		for (const [mark, ordered] of [
			[uMark, false],
			[oMark, true]
		]) {
			if (!mark.test(line)) continue;
			const buf = [];
			while (i < lines.length && mark.test(lines[i])) {
				buf.push(lines[i++].replace(mark, ''));
				// fold indented continuation lines into the current item
				while (i < lines.length && !startsBlock(lines[i]) && /^\s+\S/.test(lines[i])) {
					buf[buf.length - 1] += ' ' + lines[i++].trim();
				}
			}
			emitList(buf, ordered);
			break;
		}
		if (uMark.test(line) || oMark.test(line)) continue;

		if (line.trim() === '') {
			i++;
			continue;
		}

		const para = [];
		while (
			i < lines.length &&
			lines[i].trim() !== '' &&
			!/^(#{1,4}\s|```|>\s?|\s*[-*+]\s+|\s*\d+[.)]\s+|(-{3,}|\*{3,}|_{3,})\s*$)/.test(lines[i])
		) {
			para.push(lines[i++]);
		}
		out.push(`<p>${inline(esc(para.join(' ')))}</p>`);
	}

	return out.join('\n');
}
