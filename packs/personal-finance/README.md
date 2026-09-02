# Personal Finance

Vocabulary and conventions for reading bank and credit-card statements, added to
Fella's system prompt as "Your context" while enabled.

## What it does

It tells the model how statement exports are usually shaped one file per
account per month, an uppercase abbreviated `description`/`merchant` column,
signed `amount` vs split `debit`/`credit`, running-balance columns that must not
be summed and how to interpret common questions about spending, income, and
recurring charges. It also lists what an answer should always state: the date
range, the accounts covered, any month that looks missing, and that categories
are inferred from merchant text.

It is instructions only. It cannot make Fella state a figure it did not compute
the verification pass rejects fabricated numbers regardless.

## Install

In the app:

```
/packs install personal-finance
/packs enable personal-finance
```

Several skills can be enabled at once.

## Good questions once enabled

- How did my spending change month over month this year?
- Which merchants do I spend the most at?
- What are my recurring charges, and how much per month?
- How much did I spend on groceries last month?
