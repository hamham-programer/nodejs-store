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