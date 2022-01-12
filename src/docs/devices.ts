export const devices = {
  '/device': {
    get: {
      tags: ['Device'],
      description: 'Get all Devices',
      operationId: 'get_device',
      parameters: [],
      responses: {
        // response code
        200: {
          description: 'Devices were obtained',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/device'
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Device'],
      description: 'Insert a device',
      operationId: 'insert_device',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/deviceInput' // todo input data model
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
  }
};
