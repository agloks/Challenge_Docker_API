import pandas

df = pandas.read_csv("./import.csv",  error_bad_lines=False, sep=";")
df.to_csv("./pyd.csv")
