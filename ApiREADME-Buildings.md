GET `/main-admin`

- Get all offices, total expenses, yearly expenses, total income, yearly income, total amount, yearly amount from the database.
- Request Arguments: None
- Returns: number of total offices, total expenses, yearly expenses, total income, yearly income, total amount, yearly amount.

- For Total Amount: You need to count the amount from the income amount of office_details.
- For Yearly Amount: You need to count the amount from the income amount of office_details based on the date_of_receipt.
- For Total Expenses: You need to cut the expenses amount from the total amount.
- For Yearly Expenses: You need to cut the expenses amount from the total amount based on the date of the expense.
- For Total Income: You need to count the income amount from the income amount of office_details without the the total expenses amount.
- For Yearly Income: You need to count the income amount from the income amount of office_details without the the total expenses amount based on the dates of the expenses and office_details date_of_receipt.

Example Response `{ 
    "offices_number": 10,
    "total_expenses": 4325,
    "yearly_expenses": 4325,
    "total_income": 234,
    "yearly_income": 234,
    "total_amount": 5464,
    "yearly_amount": 3456,
    "success": true,
}`

GET `/offices`

- Get info about offices from the database.
- Request Arguments: None
- Returns: id and name.

Example Response `{
    "offices": [
        {
            "id": 1,
            "name": "1"
        }
    ],
    "success": true
}`

POST `/offices`

- Add an office to the database.
- Request Body: Name.
- Returns: name of office.

Example Request Payload `{
    "name": "1"
}`

Example Response `{
    "name": "1"
    "success": true
}`

GET `/offices/<office_id>`

- Get office details from the database.
- Request Arguments: Page Number.
- Returns: List of date of receipt, date of claiming, amount and notes.

Example Response `{
    "office_details": [
        {
            "id": 1,
            "renter": "علي",
            "date_of_receipt": "1",
            "date_of_claiming": "1",
            "amount": 1,
            "notes": "1",
        }
    ],
    "success": true
}`

POST `/offices/<office_id>`

- Add office details to the database.
- Request Body: renter, date of receipt, date of claiming, amount and notes.
- Returns: renter of office.

Example Request Payload `{
    "renter": "علي",
    "date_of_receipt": "1",
    "date_of_claiming": "1",
    "amount": 1,
    "notes": "1",
}`

Example Response `{
    "renter": "علي",
    "success": true
}`

GET `/expenses`

- Get expenses from the database.
- Request Arguments: Page Number.
- Returns: List of date of receipt, date of claiming, amount and notes.

Example Response `{
    "expenses": [
        {
            "id": 1,
            "voucher_number": 1,
            "name": "علي"
            "type": "اصلاحيات",
            "amount": 1,
        }
    ],
    "success": true
}`

POST `/expenses`

- Add an expense to the database.
- Request Body: renter, date of receipt, date of claiming, amount and notes.
- Returns: renter of office.

Example Request Payload `{
    "voucher_number": 1,
    "name": "علي"
    "type": "اصلاحيات",
    "amount": 1,
}`

Example Response `{
    "voucher_number": 12,
    "success": true
}`

GET `/notifications`

- Get notifications about date of claiming from the database.
- Request Arguments: None
- Returns: id, date_of_claiming and seen.

Example Response `{
    "notifications": [
        {
            "id": 1,
            "date_of_claiming": "1",
            "seen": 0
        }
    ],
    "success": true
}`


PATCH `/notifications/<notification_id>`

- Change the notification seen state to 1 in the database.
- Request Arguments: notification_id
- Returns: None.

Example Response `{
    "success": true
}`