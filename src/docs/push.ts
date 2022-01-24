export const pushs = {
  '/push': {
    get: {
      tags: ['Push'], // operation's tag.
      description: 'Get all Pushs', // operation's desc.
      operationId: 'get_push', // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: 'Pushs were obtained', // response desc.
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/push'
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Push'],
      description: 'Insert a push',
      operationId: 'insert_push',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/pushInput'
            }
          }
        }
      },
      responses: {
        204: {
          description: 'User successfuly created'
        },
        404: {
          description: 'Todo not found'
        },
        500: {
          description: 'Server error'
        }
      }
    }
  },
  '/push/debug': {
    get: {
      tags: ['Push'], // operation's tag.
      description: 'Get all Pushs', // operation's desc.
      operationId: 'get_push_debug', // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: 'Pushs were obtained', // response desc.
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/push'
                }
              }
            }
          }
        }
      }
    }
  }
};
