[[ -d ./data ]] && rm -rf ./data
mkdir ./data

for PREF in aichi gifu mie
do
  curl https://www.ctv.co.jp/covid-19/data/${PREF}.csv > data/${PREF}.csv
done
