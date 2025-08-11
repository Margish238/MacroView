import pandas as pd
f1=open("./FINAL FOOD DATASET/FOOD-DATA-GROUP1.csv")
f2=open("./FINAL FOOD DATASET/FOOD-DATA-GROUP2.csv")
f3=open("./FINAL FOOD DATASET/FOOD-DATA-GROUP3.csv")
f4=open("./FINAL FOOD DATASET/FOOD-DATA-GROUP4.csv")
f5=open("./FINAL FOOD DATASET/FOOD-DATA-GROUP5.csv")

df1=pd.read_csv(f1)
df2=pd.read_csv(f2)
df3=pd.read_csv(f3)
df4=pd.read_csv(f4)
df5=pd.read_csv(f5)

# print(df1.shape[0]+df2.shape[0]+df3.shape[0]+df4.shape[0]+df5.shape[0])

df = pd.concat([df1, df2, df3, df4, df5], ignore_index=True)

# Check the shape and first rows
print(df.shape)
print(df.head())

# df.to_csv("merged_food_data.csv", index=True)
# print("Merged dataset saved to merged_food_data.csv")
df=df.iloc[:,2:]
print(df.head())
# df.to_csv("merged_food_data.csv", index=True)

frame=pd.read_csv("./merged_food_data.csv")
# print(frame.isnull().sum())
