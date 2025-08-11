import csv_to_sqlite

options=csv_to_sqlite.CsvOptions(typing_style='full',encoding='windows-1250')

input = ['./dataset/merged_food_data.csv']

csv_to_sqlite.write_csv(input,'Nutrients.sqlite3',options)