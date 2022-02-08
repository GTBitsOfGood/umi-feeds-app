import sys
import requests
import os
 
file_url = sys.argv[1]
 
file_stream = requests.get(file_url, stream=True)

if(not os.path.exists('../production')):
    os.makedirs('../production')
 
with open('../production/app.tar.gz', 'wb') as local_file:
    for data in file_stream:
        local_file.write(data)
 
print('File Download Complete')