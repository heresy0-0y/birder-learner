class CreateFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :favorites do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :type
      t.string :identifier

      t.timestamps
    end
  end
end
