export const components = {
  components: {
    schemas: {
      // id model
      userId: {
        type: 'string',
        description: 'User Id',
        example: '61d0d0e41ab6fb418ce82f5e',
        modelPropertyNaming: 'camelCase'
      },
      message: {
        type: 'string',
        description: 'Message sent to push to other devices',
        example: 'Remember to water the plants.',
        modelPropertyNaming: 'camelCase'
      },
      sentFromDeviceId: {
        type: 'string',
        description: 'Id of device that the message was sent from',
        example: '61d4d6cda245c055b68ef337',
        modelPropertyNaming: 'camelCase'
      },
      id: {
        type: 'string',
        description: 'Id of document in database',
        example: '61d4d450a245c055b68c358b',
        modelPropertyNaming: 'camelCase'
      },
      deviceType: {
        type: 'string',
        description: 'Type of device used, either android or browser',
        example: 'android'
      },
      androidDeviceId: {
        type: 'string',
        description: 'Id of android device for firebase to identify it',
        example:
          'fqPbK7AHQre2MgspsYolYF:APA91bGgPno3WJV29atuPYiJbcimZgFynBpXZR5Kt22Zf-CPdWNYY4w6R2ua-6-GkWpOZgr4iky1c9tWH_f9EXghzVNQvMpYScmaeuAA1qHKV_SuX7lMsbLhGE0TeBdLlMPQXlWPDjnl'
      },
      push: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id'
          },
          message: {
            $ref: '#/components/schemas/message'
          },
          userId: {
            $ref: '#/components/schemas/userId'
          },
          sentFromDeviceId: {
            $ref: '#/components/schemas/sentFromDeviceId'
          }
        }
      },
      pushInput: {
        type: 'object',
        properties: {
          message: {
            $ref: '#/components/schemas/message'
          },
          userId: {
            $ref: '#/components/schemas/userId'
          },
          sentFromDeviceId: {
            $ref: '#/components/schemas/sentFromDeviceId'
          },
          token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFuaWVsIiwidXNlcklkIjoiNjFkN2M4MzNhMjQ1YzA1NWI2ZjYzYTk3IiwiZGV2aWNlVHlwZSI6ImFuZHJvaWQiLCJleHRlcm5hbERldmljZUlkIjoiMTIzIiwiaWF0IjoxNjQxNzY3NzgxfQ.ALm86bWEahVCarHjwDi6K1g2mX-Uo75TySZUwbUfEP0'
          }
        }
      },
      device: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id'
          },
          deviceType: {
            $ref: '#/components/schemas/deviceType'
          },
          androidDeviceId: {
            $ref: '#/components/schemas/androidDeviceId'
          },
          userId: {
            $ref: '#/components/schemas/userId'
          }
        }
      },
      deviceInput: {
        type: 'object',
        properties: {
          deviceType: {
            $ref: '#/components/schemas/deviceType'
          },
          androidDeviceId: {
            $ref: '#/components/schemas/androidDeviceId'
          },
          userId: {
            $ref: '#/components/schemas/userId'
          }
        }
      },
      // error model
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Not found' // example of an error message
          },
          internal_code: {
            type: 'string', // data type
            description: 'Error internal code', // desc
            example: 'Invalid parameters' // example of an error internal code
          }
        }
      }
    }
  }
};
