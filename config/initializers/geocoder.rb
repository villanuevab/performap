require 'redis'

REDIS = Redis.new(url: ENV['REDISTOGO_URL'])

Geocoder.configure(
  lookup: :google,
  use_https: true,
  cache: REDIS,
  always_raise: [
    Geocoder::OverQueryLimitError,
    Geocoder::RequestDenied,
    Geocoder::InvalidRequest,
    Geocoder::InvalidApiKey
  ]
)