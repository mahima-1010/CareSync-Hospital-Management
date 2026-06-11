import sqlite3
import os

db_path = os.path.expandvars(r'%APPDATA%\pgAdmin\pgadmin4.db')

if not os.path.exists(db_path):
    print(f"Database not found at: {db_path}")
    exit(1)

print(f"Connecting to pgAdmin DB at: {db_path}")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    print("Tables in pgadmin4.db:")
    print(tables)
    
    # Check server table
    if 'server' in tables:
        print("\n=== SERVER TABLE ===")
        cursor.execute("PRAGMA table_info(server);")
        columns = [col[1] for col in cursor.fetchall()]
        print("Columns:", columns)
        
        cursor.execute("SELECT * FROM server;")
        rows = cursor.fetchall()
        for row in rows:
            print(dict(zip(columns, row)))
            
    # Check servergroup table
    if 'servergroup' in tables:
        print("\n=== SERVERGROUP TABLE ===")
        cursor.execute("SELECT * FROM servergroup;")
        print(cursor.fetchall())
        
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
