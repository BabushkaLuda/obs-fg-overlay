# save this as app.py
from flask import Flask, render_template, request, json, redirect, url_for

app = Flask(__name__)

def load_players():
    with open('players.json', 'r', encoding='utf-8') as f:
        return json.load(f)
        
@app.route("/", methods=['GET', 'POST'])
def index():
    players = load_players()
    selected_players = {'first': None, 'second' : None}
    if request.method == "POST":
        player1_name = request.form.get('player1_name')
        player2_name = request.form.get('player2_name')
        action = request.form.get('action')
        if action == 'Set Players':
            selected_players['first'] = next(p for p in players if p['name'] == player1_name)
            selected_players['second'] = next(p for p in players if p['name'] == player2_name)
        elif action == 'Swap Players':
            player1_name = request.form.get('currentP2')
            player2_name = request.form.get('currentP1')
            selected_players['first'] = next(p for p in players if p['name'] == player1_name)
            selected_players['second'] = next(p for p in players if p['name'] == player2_name)
    return render_template('1.html', players=players, first_player=selected_players['first'], second_player=selected_players['second'])
    
if __name__ == '__main__':
    app.run(debug=True)