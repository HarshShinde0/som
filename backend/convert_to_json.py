import pandas as pd

# Load IMDb movies CSV file
csv_path = 'imdb_movies.csv'
data = pd.read_csv(csv_path)

# Print column names to verify them
print("Available columns:", data.columns.tolist())

# Update this line with the actual column names found in your CSV file
# Modify the list below based on the columns that are actually present in the CSV
try:
    selected_columns = data[['Title', 'Year', 'Rating', 'Genre', 'Director']]
except KeyError:
    print("Some columns are missing. Adjust the column names in `selected_columns` based on the output above.")
    selected_columns = data  # Optionally, you can use the entire DataFrame as fallback

# Sort the data by 'Rating' column if it exists
if 'Rating' in selected_columns.columns:
    sorted_data = selected_columns.sort_values(by='Rating', ascending=False)
else:
    sorted_data = selected_columns

# Convert to JSON format and save
json_data = sorted_data.to_json(orient='records')
with open('../public/imdb_movies.json', 'w') as json_file:
    json_file.write(json_data)
