type Payload = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export function createPayload(user: any): any {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
