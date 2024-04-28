## Assigning values in DataFrame
Some operations in pandas create copies of the DataFrame. Consequently, assignments may sometimes do not work as expected. When there is a chance of unexpected behaviour the **SettingWithCopyWarning** gets thrown.

You should use `.loc` for label-based assignment, and `.iloc` for integer/positional based assignment. This way the spec guarantees that they always operate on the original DataFrame. Additionally, for setting a single cell, you should use `.at` and `.iat`, respectively.
[Source](https://stackoverflow.com/questions/20625582/how-to-deal-with-settingwithcopywarning-in-pandas)

## Querying in DataFrame
```python
# Quickest: boolean indexing with DataFrame.loc:
df.loc[df['column_name'] > 5]

# Fast but little intuitive: DataFrame.iloc:
df.iloc[2:5]

# .query() with SQL-like queries.
df.query('column_name > 5')

# .where() return  NaNs where condition is not met
df.where(df['column_name'] > 5)

# .query() with numexpr for large DataFrames and complex expression
df.query('column_name > 5', engine='numexpr')
```

## Inserting values in DataFrame
The quickest way is to insert in batch using `pd.concat`.
