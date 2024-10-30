import os
import pandas as pd

# Load the CSV file
csv_path = '/workspace/som/ec7c59c1-ed89-4229-880a-31e82d155bf9.csv'  # Replace with your file path
data = pd.read_csv(csv_path)

# Select necessary columns and rename if needed
selected_columns = data[['Const', 'Title', 'Year']]  # Assuming 'Const' is the IMDb ID column
selected_columns.columns = ['imdbID', 'Title', 'Year']

# Create the 'public' directory if it doesn't exist
output_dir = 'public'
os.makedirs(output_dir, exist_ok=True)

# Save to JSON
json_path = os.path.join(output_dir, 'imdb_movies.json')
selected_columns.to_json(json_path, orient='records')
print(f"JSON saved to {json_path}")
