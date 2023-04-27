@listings.map do |listing|
    json.set! listing.id do
      json.partial! 'listing', listing: listing 
      json.photos listing.photos.map {|file| url_for(file)}
    end
end