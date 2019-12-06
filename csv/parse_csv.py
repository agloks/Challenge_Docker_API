try: 
  import pandas
  import sys
except:
  raise("Instale o pandas --> pip<version python?> install pandas\n")

df = pandas.read_csv(sys.argv[1],  error_bad_lines=False, sep=";")
tf = sys.argv[1].replace(".csv","")
df.to_csv(f"./{tf}-parsed.csv")
