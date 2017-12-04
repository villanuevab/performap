require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get directory" do
    get home_directory_url
    assert_response :success
  end

  test "should get map" do
    get home_map_url
    assert_response :success
  end

end
