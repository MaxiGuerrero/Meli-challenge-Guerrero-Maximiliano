/**
 * First position (0) is the token to get real data
 * Second position (1) is the token to get fake data
 */
export const tokenAuth = [
  process.env.TOKEN || 'e962f81a-4d42-4eb3-86cd-a25e7237c8dc',
  process.env.TOKEN_MOCK_AUTH || '55a4639f-55e8-4e14-a6cc-b79977b20a4e',
];
