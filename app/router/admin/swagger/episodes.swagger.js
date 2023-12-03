/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text    
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 6542368989832146566876
 *                  chapterID:
 *                      type: string
 *                      example: 6542368989832146566876
 *                  title:
 *                      type: string
 *                      description: the title of episodes
 *                      example:  ویدیو شماره یک 
 *                  text:
 *                      type: string
 *                      example: the describe about this episodes
 *                  video:
 *                      type: string
 *                      description: the file of video 
 *                      format: binary
 *                  type:
 *                      type: string
 *                      description: the episodes type(unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *          EditEpisode:
 *              type: object     
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  text: 
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video: 
 *                      type: string
 *                      description: the file of video 
 *                      format: binary
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: create new Episode  for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data: 
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: success - created
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode(AdminPanel)]
 *          summary: remove episode of chapters
 *          parameters:
 *              -    in: path
 *                   name: episodeID
 *                   type: string
 *                   required: true
 *          responses:
 *              201:
 *                  description: success - remove
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/update/{episodeID}:
 *      patch:
 *          tags: [Episode(AdminPanel)]
 *          summary: edit Episode  of chapters
 *          parameters:
 *              -    in: path
 *                   name: episodeID
 *                   type: string
 *                   required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data: 
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              201:
 *                  description: success - update
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */