import PyPDF2
import camelot

def extract_tables_with_different_modes(pdf_path):
    try:
        # Using lattice mode for tables with borders
        tables_lattice = camelot.read_pdf(pdf_path, pages='all')
        print(f"Found {len(tables_lattice)} tables using lattice mode")
        for i, table in enumerate(tables_lattice):
            # print(f"Lattice Table {i}:\n", table.df)
            table.to_csv(f"lattice_table_{i}.csv")

        # Using stream mode for tables without borders
        tables_stream = camelot.read_pdf(pdf_path, pages='all', flavor='stream')
        print(f"Found {len(tables_stream)} tables using stream mode")
        for i, table in enumerate(tables_stream):
            # print(f"Stream Table {i}:\n", table.df)
            table.to_csv(f"stream_table_{i}.csv")

    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
pdf_path = r"C:\Users\MaheenUnzeelah\Documents\Hackathon\UserStory1.pdf"
extract_tables_with_different_modes(pdf_path)
