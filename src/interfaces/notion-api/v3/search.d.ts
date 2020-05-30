/*
Request:
{
    "type":"CollectionsInSpace",
    "query":"",
    "spaceId":"46ee3770-dcad-4c66-ae90-06d2cc2bf489",
    "limit":20,
    "filters":{
       "isDeletedOnly":false,
       "excludeTemplates":true,
       "isNavigableOnly":false,
       "requireEditPermissions":true,
       "ancestors":[
 
       ],
       "createdBy":[
 
       ],
       "editedBy":[
 
       ],
       "lastEditedTime":{
 
       },
       "createdTime":{
 
       }
    },
    "sort":"Relevance",
    "source":"link_to_collection_block"
 }

Response:
  see "search-response.yml"
 */

import { Map } from "./Map"
import { CollectionRecord } from "./Record"

import { Util } from "../../"

export namespace Search {
  interface Request {
    type: "CollectionsInSpace"
    query: string
    spaceId: Util.UUID
    limit: 20
    sort: "Relevance"
    source: "link_to_collection_block"
    filters: {
      isDeletedOnly: false
      excludeTemplates: true
      isNavigableOnly: false
      requireEditPermissions: true
      ancestors: []
      createdBy: []
      editedBy: []
      lastEditedTime: []
      createdTime: []
    }
  }

  interface CollectionResultId {
    id: Util.UUID
    isNavigable: boolean
    score: number
  }

  interface Response {
    results: CollectionResultId[]
    total: number
    recordMap: {
      collection: Map<CollectionRecord>
    }
  }
}
