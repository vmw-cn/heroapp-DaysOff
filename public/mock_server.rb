require 'sinatra'
require 'json'

get '/' do
  'mock server for Log Insight'
end

get '/li/api/:verb' do
  content_type :json
  jsonFile = "test/json/#{params[:verb]}.json"
  puts jsonFile
  puts request["st"] if request["st"]
  puts request["et"] if request["et"]
  puts request["fieldConstraint"] if request["fieldConstraint"]
  loadJSONFile(jsonFile).to_json if File.file?(jsonFile)
end

get '/css/common.css' do
  content_type :css

  #File.read('../static/css/common.css')
  generateContent('common.css', 'css')
end

get '/pages/home/routes.js' do
  content_type :js

  File.read('../static/pages/home/routes.js')
  #generateContent('common.js', 'js')
end

def generateContent(resourceName, type)
  config = loadJSONFile('mock_server.config')
  content = ''

  config[resourceName].each do |resource|
    content += File.read(resource) if File.file?(resource)
  
    if File.directory?(resource)
      Dir.glob(resource + "/**/*.#{type}") { |file| content += File.read(file) if File.file?(file) }
    end
  end

  content
end

def loadJSONFile(filename)
  File.open(filename, 'r') do |f|
    JSON.load(f)
  end
end