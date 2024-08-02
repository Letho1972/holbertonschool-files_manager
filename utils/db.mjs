import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;
    console.log(`Attempting to connect to MongoDB at: ${uri}`);

    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.connected = false;

    this.client.connect()
      .then(() => {
        this.connected = true;
        console.log('Connected successfully to MongoDB server');
      })
      .catch(error => {
        console.error('Failed to connect to MongoDB:', error.message);
      });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    const db = this.client.db();
    const usersCollection = db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    const db = this.client.db();
    const filesCollection = db.collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
