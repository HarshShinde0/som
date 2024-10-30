import pandas as pd

# Load IMDb movies CSV file
csv_path = '/workspace/som/backend/imdb_movies.csv'  # Update path as needed
data = pd.read_csv(csv_path)

# Print available columns to verify them
print("Available columns:", data.columns.tolist())

# Select and rename columns based on the available columns in your CSV
try:
    selected_columns = data[['Title', 'Year', 'IMDb Rating']]
except KeyError:
    print("Some columns are missing. Adjust the column names in `selected_columns` based on the output above.")
    selected_columns = data  # Optionally, you can use the entire DataFrame as fallback

# Drop additional unnecessary columns if they exist
columns_to_drop = ['Position', 'Created', 'Modified', 'Description', 'Genres', 'Num Votes', 'Release Date', 
                   'Directors', 'Your Rating', 'Date Rated', 'Runtime (mins)']
selected_columns = selected_columns.drop(columns=[col for col in columns_to_drop if col in selected_columns.columns])

# Sort the data by 'IMDb Rating' column if it exists
if 'IMDb Rating' in selected_columns.columns:
    sorted_data = selected_columns.sort_values(by='IMDb Rating', ascending=False)
else:
    sorted_data = selected_columns

# Convert to JSON format and save
json_data = sorted_data.to_json(orient='records')
with open('/workspace/som/public/imdb_movies.json', 'w') as json_file:
    json_file.write(json_data)
