import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'IP Info Website'
  }
});

// Add retry functionality
axiosInstance.interceptors.response.use(null, async (error) => {
  const { config } = error;
  config.retryCount = config.retryCount || 0;
  
  if (config.retryCount >= 2) {
    return Promise.reject(error);
  }
  
  config.retryCount += 1;
  const delay = config.retryCount * 1000;
  await new Promise(resolve => setTimeout(resolve, delay));
  return axiosInstance(config);
});

const APIs = [
  {
    url: 'https://ipapi.co/json/',
    validateData: (data) => data.ip && data.country_name
  },
  {
    url: 'https://ipwho.is/',
    validateData: (data) => data.success && data.ip,
    transform: (data) => ({
      ip: data.ip,
      country_name: data.country,
      region: data.region,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      org: data.connection.org,
      asn: data.connection.asn,
      timezone: data.timezone.id
    })
  },
  {
    url: 'https://api.ip.sb/geoip',
    validateData: (data) => data.ip && data.country,
    transform: (data) => ({
      ip: data.ip,
      country_name: data.country,
      region: data.region,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      org: data.organization,
      asn: data.asn,
      timezone: data.timezone
    })
  }
];

export const fetchIPInfo = async () => {
  let lastError = null;

  for (const api of APIs) {
    try {
      const response = await axiosInstance.get(api.url);
      const data = response.data;

      // Validate the data
      if (!api.validateData(data)) {
        throw new Error('Invalid or incomplete data received');
      }

      // Transform the data if needed
      const transformedData = api.transform ? api.transform(data) : data;
      return normalizeIPData(transformedData);
    } catch (error) {
      lastError = error;
      console.error('API Error:', {
        api: api.url,
        status: error.response?.status,
        message: error.message
      });
    }
  }

  throw new Error(lastError?.message || 'Failed to fetch IP information');
};

const normalizeIPData = (data) => ({
  ip: data.ip || '',
  country_name: data.country_name || '',
  region: data.region || '',
  city: data.city || '',
  latitude: data.latitude || 0,
  longitude: data.longitude || 0,
  org: data.org || '',
  asn: data.asn || '',
  timezone: data.timezone || ''
});