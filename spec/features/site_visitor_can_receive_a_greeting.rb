require 'rails_helper'

RSpec.feature 'Site Visitor Can Receive a Greeting', :type => :feature do
  scenario 'Receive a Personal Greeting', :js do
    visit '/hello_world' # given
    expect(page).not_to have_content('Hello, Bar!')
    name_input = find('input')
    expect(name_input.value).not_to eq 'Bar'

    name_input.set 'Bar' # when

    expect(name_input.value).to eq 'Bar' # then
    expect(page).to have_content('Hello, Bar!')
  end

  scenario 'Learn About Who Developed the React On Rails Gem' do
    expected_citation_link = # given
      'https://github.com/shakacode/react_on_rails/blob/master/docs/' +
      'tutorial.md'

    visit hello_world_path # when

    citation_link =  find( # then
                          '[data-role="cite-source"]',
                          text: 'Learn more about the react-on-rails gem!',
                          )
    expect(citation_link[:href]).to eq expected_citation_link
  end
end
