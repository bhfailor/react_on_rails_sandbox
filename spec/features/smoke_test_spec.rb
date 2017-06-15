require 'rails_helper'

RSpec.feature 'smoke test', :type => :feature do
  scenario 'Visit root page', :js do
    visit '/hello_world' # given
    expect(page).to have_content('Hello, Ranger!')
    name_input = find('input')
    expect(name_input.value).to eq 'Ranger'

    name_input.set 'Bar' # when

    expect(name_input.value).to eq 'Bar' # then
    expect(page).to have_content('Hello, Bar!')
    expect(page).not_to have_content('Hello, Ranger!')
  end
end
