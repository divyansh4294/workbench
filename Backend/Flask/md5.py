import hashlib
  
# encoding GeeksforGeeks using md5 hash
# function 
result = hashlib.md5(b'divyanshgupta')
result1 = hashlib.md5(b'divyansh.gupta')

  
# printing the equivalent byte value.
print("The byte equivalent of hash is result : ", end ="")
print(result.digest())
print('\n')
print("The byte equivalent of hash is result1 : ", end ="")
print(result1.digest())

