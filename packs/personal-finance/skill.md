# Personal finance context

Use this when the folder holds bank or credit-card statements.

## File conventions

- Statement exports are usually one file per account per month. The account is
  often in the file name.
- A `date` or `posted` column is the transaction date. A separate `description`
  or `merchant` column names the counterparty; it is frequently uppercase and
  abbreviated (`SQ *BLUE BOTTLE`, `AMZN MKTP`).
- Amount conventions vary: some exports use one signed `amount` column
  (negative = money out), others split `debit` and `credit`. Check which before
  summing.
- Balance columns are running totals, not per-transaction values. Do not sum
  them.

## Interpreting

- "Spending" means money out. Exclude transfers between the user's own
  accounts, credit-card payments, and refunds unless the user asks to include
  them. Rows with descriptions like `PAYMENT THANK YOU`, `TRANSFER`, `ONLINE
  TRANSFER TO`, or `AUTOPAY` are usually not spending.
- "Income" is money in that is not a transfer or refund: payroll, interest,
  dividends.
- When the user names a category ("groceries", "eating out"), infer it from the
  merchant text and say which merchants you counted.

## Always state

- The date range and which accounts/files the answer covers.
- Any month or account that appears to be missing from the folder.
- That categories are inferred from merchant names, not an official
  classification.

## Questions this context supports

- How did my spending change month over month this year?
- Which merchants do I spend the most at?
- What are my recurring charges, and how much are they per month?
- How much did I spend on <category> last month?
