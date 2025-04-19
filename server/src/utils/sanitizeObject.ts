export const sanitizeObject = (
  obj: Record<string, any>,
  allowList?: string[],
  denyList: string[] = ['__proto__', 'constructor', 'prototype', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable']
): Record<string, any> => {
  const sanitizedObj = Object.create(null);
  
  if (typeof obj !== 'object' || obj === null) {
    return sanitizedObj;
  }
  
  Object.keys(obj).forEach(key => {
    if (denyList.includes(key)) {
      return;
    }
    
    if (allowList && !allowList.includes(key)) {
      return;
    }
    
    const value = obj[key];
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitizedObj[key] = sanitizeObject(value, undefined, denyList);
    } 
    else if (Array.isArray(value)) {
      sanitizedObj[key] = value.map(item => 
        typeof item === 'object' && item !== null 
          ? sanitizeObject(item, undefined, denyList) 
          : item
      );
    } 
    else {
      sanitizedObj[key] = value;
    }
  });
  
  return sanitizedObj;
};

export const sanitizeRequestBody = (
  body: Record<string, any>,
  allowedFields: string[]
): Record<string, any> => {
  return sanitizeObject(body, allowedFields);
};

export const sanitizeBodyMiddleware = (allowedFields: string[]) => {
  return (req: any, res: any, next: any) => {
    req.body = sanitizeRequestBody(req.body, allowedFields);
    next();
  };
};

export const safeObjectAssign = (
  target: Record<string, any>, 
  ...sources: Record<string, any>[]
): Record<string, any> => {
  const sanitizedTarget = sanitizeObject(target);
  
  sources.forEach(source => {
    const sanitizedSource = sanitizeObject(source);
    Object.keys(sanitizedSource).forEach(key => {
      sanitizedTarget[key] = sanitizedSource[key];
    });
  });
  
  return sanitizedTarget;
}; 