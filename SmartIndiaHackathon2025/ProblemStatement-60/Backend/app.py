from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/update_bin_fill_level', methods=['POST'])
def update_bin_fill_level():
    data = request.json
    if not data or 'bin_id' not in data or 'fill_level' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    bin_id = data['bin_id']
    fill_level = data['fill_level']
    print(f"Received update for Bin {bin_id}: fill level is now {fill_level}%")
    
    return jsonify({'message': f"Bin {bin_id} fill level updated to {fill_level}%"}), 200

if __name__ == '__main__':
    app.run(port=5000)
