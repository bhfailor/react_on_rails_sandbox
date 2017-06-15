require 'rails_helper'

RSpec.feature 'Site Visitor Can Choose An Activity', :type => :feature do
  scenario 'Links are visible' do #, :js do
    expect(root_path).not_to be_nil # given

    visit root_path # when

    expect(page).to have_css(  # then
                             '[data-role="link-to-receive-greeting"]',
                             text: 'Receive a Greeting!',
                             )
    expect(page).to have_css(
                             '[data-role="link-to-play-game"]',
                             text: 'Test your Memory!',
                             )
  end

  describe 'Visiting a link' do
    scenario 'to receive a greeting' do
      visit root_path # given
      greeting_link = find('[data-role="link-to-receive-greeting"]')

      greeting_link.click # when

      expect(page).to have_css('[data-role="name-input-for-greeting"]') # then
    end

    scenario 'to play a game' do
      visit root_path # given
      game_link = find('[data-role="link-to-play-game"]')

      game_link.click # when

      expect(page).to have_css('[data-role="container-for-game"]') # then
    end
  end
end
