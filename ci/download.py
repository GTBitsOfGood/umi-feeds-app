import sys
import requests
 
file_url = sys.argv[1]
 
file_stream = requests.get(file_url, stream=True)
 
with open('../production/app2.tar.gz', 'wb') as local_file:
    for data in file_stream:
        local_file.write(data)
 
print('Done')