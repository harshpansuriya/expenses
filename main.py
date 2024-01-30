import os
import pandas as pd
from datetime import datetime
import tabula  # for reading PDFs
import matplotlib.pyplot as plt
from reportlab.pdfgen import canvas


def plot_expenses_chart(data):
    if data.empty:
        print("No expenses recorded for plotting.")
        return

    # Group data by expense type and calculate the total expense for each type
    expense_by_type = data.groupby('Type')['Price'].sum()

    # Plotting
    plt.figure(figsize=(10, 6))
    expense_by_type.sort_values(ascending=False).plot(
        kind='bar', color='skyblue')
    plt.title('Expense Distribution by Type')
    plt.xlabel('Expense Type')
    plt.ylabel('Total Expense')
    plt.xticks(rotation=45, ha='right')
    plt.show()


def load_data():
    try:
        data = pd.read_csv('expenses.csv', parse_dates=['Date'])
    except FileNotFoundError:
        return pd.DataFrame(columns=['Type', 'Description', 'Price', 'Date'])
    except pd.errors.EmptyDataError:
        return pd.DataFrame(columns=['Type', 'Description', 'Price', 'Date'])

    data['Date'] = pd.to_datetime(data['Date'], errors='coerce')

    return data


def save_data(data):
    data.to_csv('expenses.csv', index=False)


def add_expense():
    expense_type = input("Enter expense type: ")
    description = input("Enter expense description: ")
    price = float(input("Enter expense price: "))
    date_str = input("Enter expense date (YYYY-MM-DD): ")

    try:
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return None

    return {
        'Type': expense_type,
        'Description': description,
        'Price': price,
        'Date': date
    }


def view_expenses(data):
    if data.empty:
        print("No expenses recorded.")
    else:
        print(data)


def delete_expense(data, index):
    try:
        data = data.drop(index)
        print("Expense deleted successfully!")
        return data
    except KeyError:
        print("Invalid index. Please enter a valid index.")
        return data


def analyze_expenses(data):
    if data.empty:
        print("No expenses recorded for analysis.")
    else:
        total_expenses = data['Price'].sum()
        average_expense = data['Price'].mean()
        highest_expense = data.loc[data['Price'].idxmax()]
        print(f"\nExpense Analysis:")
        print(f"Total Expenses: ${total_expenses:.2f}")
        print(f"Average Expense: ${average_expense:.2f}")
        print(f"Highest Expense:\n{highest_expense}")

        # Month-wise analysis
        data['Month'] = data['Date'].dt.month
        month_stats = data.groupby('Month')['Price'].agg([
            'sum', 'mean', 'max'])
        month_stats.index = month_stats.index.map(
            {1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August',
             9: 'September', 10: 'October', 11: 'November', 12: 'December'})
        print("\nMonth-wise Analysis:")
        print(month_stats)


def import_expenses_data():
    print("Select the file format to import:")
    print("1. CSV")
    print("2. Excel")
    print("3. PDF")
    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        file_path = input("Enter the CSV file path: ")
        try:
            new_data = pd.read_csv(file_path, parse_dates=['Date'])
            return new_data
        except FileNotFoundError:
            print("File not found. Please check the file path.")
        except Exception as e:
            print(f"Error: {e}")
    elif choice == '2':
        file_path = input("Enter the Excel file path: ")
        try:
            new_data = pd.read_excel(file_path, parse_dates=['Date'])
            return new_data
        except FileNotFoundError:
            print("File not found. Please check the file path.")
        except Exception as e:
            print(f"Error: {e}")
    elif choice == '3':
        file_path = input("Enter the PDF file path: ")
        try:
            new_data = tabula.read_pdf(
                file_path, pages='all', multiple_tables=True)
            new_data = pd.concat(new_data, ignore_index=True)
            new_data['Date'] = pd.to_datetime(
                new_data['Date'], errors='coerce')
            return new_data.dropna()  # Drop rows with missing values
        except FileNotFoundError:
            print("File not found. Please check the file path.")
        except Exception as e:
            print(f"Error: {e}")
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")


def export_expenses_data(data):
    print("Select the file format to export:")
    print("1. CSV")
    print("2. Excel")
    print("3. PDF")
    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        file_name = input(
            "Enter the CSV file name for export (without extension): ")
        file_path = f"{file_name}.csv"
        data.to_csv(file_path, index=False)
        print(f"Expenses data exported to {file_path} successfully!")
    elif choice == '2':
        file_name = input(
            "Enter the Excel file name for export (without extension): ")
        file_path = f"{file_name}.xlsx"
        data.to_excel(file_path, index=False)
        print(f"Expenses data exported to {file_path} successfully!")
    elif choice == '3':
        file_name = input(
            "Enter the PDF file name for export (without extension): ")
        file_path = f"{file_name}.pdf"
        export_to_pdf(data, file_path)
        print(f"Expenses data exported to {file_path} successfully!")
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")


def export_to_pdf(data, file_path):
    plt.figure(figsize=(10, 6))
    plt.table(cellText=data.values, colLabels=data.columns,
              cellLoc='center', loc='center')
    plt.axis('off')
    plt.savefig('temp_table.png', bbox_inches='tight', pad_inches=0.5)

    c = canvas.Canvas(file_path, pagesize=(plt.gcf().get_size_inches()[
                      0] * 72, plt.gcf().get_size_inches()[1] * 72))
    c.drawImage('temp_table.png', 0, 0, width=plt.gcf().get_size_inches()[0] * 72,
                height=plt.gcf().get_size_inches()[1] * 72)
    c.save()
    os.remove('temp_table.png')


def main():
    expenses = load_data()

    while True:
        print("\nExpense Tracker Menu:")
        print("1. Add Expense")
        print("2. View Expenses")
        print("3. Delete Expense")
        print("4. Analyze Expenses")
        print("5. Analyze Month-wise Expenses")
        print("6. Import Expenses Data")
        print("7. Export Expenses Data")
        print("8. Plot Expenses Chart")
        print("9. Quit")

        choice = input("Enter your choice (1/2/3/4/5/6/7/8/9): ")

        if choice == '1':
            expense = add_expense()
            if expense is not None:
                expenses = pd.concat([expenses, pd.Series(
                    expense).to_frame().T], ignore_index=True)
                save_data(expenses)
                print("Expense added successfully!")
        elif choice == '2':
            view_expenses(expenses)
        elif choice == '3':
            view_expenses(expenses)
            index_to_delete = input(
                "Enter the index of the expense to delete: ")
            expenses = delete_expense(expenses, int(index_to_delete) - 1)
            save_data(expenses)
        elif choice == '4':
            analyze_expenses(expenses)
        elif choice == '5':
            # Same function for overall and month-wise analysis
            analyze_expenses(expenses)
        elif choice == '6':
            new_data = import_expenses_data()
            if new_data is not None:
                expenses = pd.concat([expenses, new_data], ignore_index=True)
                save_data(expenses)
                print("Expenses data imported successfully!")
        elif choice == '7':
            export_expenses_data(expenses)
        elif choice == '8':
            plot_expenses_chart(expenses)
        elif choice == '9':
            print("Exiting Expense Tracker. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, 3, 4, 5, 6, 7, 8 or 9.")


if __name__ == "__main__":
    main()
