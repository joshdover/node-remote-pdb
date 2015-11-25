from remote_pdb import RemotePdb

def add(x, y):
    return x + y

RemotePdb('127.0.0.1', 4444).set_trace()

x = 4
y = 2
z = add(x, y)
