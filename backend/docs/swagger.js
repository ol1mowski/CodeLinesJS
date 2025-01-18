export const settingsApiDoc = {
  '/api/settings/profile': {
    get: {
      summary: 'Get user profile',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'User profile data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  email: { type: 'string' },
                  profile: {
                    type: 'object',
                    properties: {
                      bio: { type: 'string' },
                      avatar: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // ... więcej endpointów
}; 