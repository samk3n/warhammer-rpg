/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("igsoo8nf2679n90")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nacg5g5l",
    "name": "corruption",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rdch93hr",
    "name": "mutations",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("igsoo8nf2679n90")

  // remove
  collection.schema.removeField("nacg5g5l")

  // remove
  collection.schema.removeField("rdch93hr")

  return dao.saveCollection(collection)
})
