GET `/main-admin`

- Get all offices, total expenses, yearly expenses, total income, yearly income, total amount, yearly amount from the database.
- Request Arguments: None
- Returns: number of total offices, total expenses, yearly expenses, total income, yearly income, total amount, yearly amount.

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

- Add office details to the database, and on each addition there will be an increment in the total amount and the total income.
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

- Add an expense to the database, on each added expense there will be cut from the total amount and increment to the total expense.
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