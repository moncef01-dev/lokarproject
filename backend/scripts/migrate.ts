import mongoose from 'mongoose';

async function migrate() {
  const oldUri = 'mongodb+srv://lokar_db:G59thXSqq1y30Ud9@lokarcluster.ifoeeht.mongodb.net/lokar_db?appName=LokarCluster';
  const newUri = 'mongodb+srv://lokardb:mmoncef20@lokar.jknp8rc.mongodb.net/lokar';

  console.log('Connecting to old database...');
  const oldConnection = await mongoose.createConnection(oldUri).asPromise();
  
  console.log('Connecting to new database...');
  const newConnection = await mongoose.createConnection(newUri).asPromise();

  console.log('Fetching collections from old database...');
  const oldDb = oldConnection.db!;
  const newDb = newConnection.db!;

  const collections = await oldDb.listCollections().toArray();

  for (const collectionInfo of collections) {
    const colName = collectionInfo.name;
    
    // Skip systems and views
    if (colName.startsWith('system.') || collectionInfo.type === 'view') continue;
    
    console.log(`\nMigrating collection: ${colName}`);
    
    const oldCol = oldDb.collection(colName);
    const newCol = newDb.collection(colName);

    const docs = await oldCol.find({}).toArray();
    console.log(`Found ${docs.length} documents in ${colName}`);
    
    if (docs.length > 0) {
      // clear standard target collections before migrating
      await newCol.deleteMany({});
      
      try {
          await newCol.insertMany(docs);
          console.log(`Successfully inserted ${docs.length} documents into new ${colName}`);
      } catch (e: any) {
          console.error(`Error migrating ${colName}:`, e.message);
      }
    } else {
      console.log(`No documents found in ${colName}. Ensuring empty collection exists...`);
      try {
        await newDb.createCollection(colName);
      } catch (e) {
        // Ignores NamespaceExists error
      }
    }
  }

  console.log('\nMigration completed successfully!');
  await oldConnection.close();
  await newConnection.close();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
