import msparser
import json
import sys

outputs = []

for filePath in sys.argv[1:]:
    outputs.append(msparser.parse_file(filePath))


print(json.dumps(outputs))