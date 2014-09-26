require 'uri'
require 'httparty'
require 'json'

class GoogleBooksParser
  def self.get_books(search_term)
    json_response = HTTParty.get(build_search_url(search_term))
    json_response.parsed_response["items"].map do |item|
      parseBookFromJSON(item["volumeInfo"])
    end
  end

  private
    def self.parseBookFromJSON(item_json)
      book_data = {}
      book_data[:author] = (item_json["authors"] || []).join(", ")
      book_data[:title] =  item_json["title"]
      book_data[:page_count] = item_json["pageCount"]
      book_data[:image_url] = item_json["imageLinks"]["thumbnail"]

      Book.new(book_data)
    end

    def self.build_search_url(search_term)
      URI.escape("https://www.googleapis.com/books/v1/volumes?q=#{search_term}")
    end
end
