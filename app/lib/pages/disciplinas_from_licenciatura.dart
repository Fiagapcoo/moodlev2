import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class DisciplinasFromLicenciatura extends StatefulWidget {
  final int licenciaturaId;

  const DisciplinasFromLicenciatura({Key? key, required this.licenciaturaId}) : super(key: key);

  @override
  _DisciplinasFromLicenciaturaState createState() => _DisciplinasFromLicenciaturaState();
}

class _DisciplinasFromLicenciaturaState extends State<DisciplinasFromLicenciatura> {
  List<String> disciplinas = [];

  @override
  void initState() {
    super.initState();
    fetchDisciplinas();
  }

  Future<void> fetchDisciplinas() async {
    try {
      final response = await http.get(Uri.parse('https://04b6-2001-818-ea57-fa00-4bc8-ec8e-70bc-72b5.ngrok-free.app/disciplina/getdisciplinas'));
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        setState(() {
          disciplinas = data.map((entry) => entry['Nome_disciplina'].toString()).toList();
        });
      } else {
        throw Exception('Failed to load disciplinas');
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Disciplinas from Licenciatura ${widget.licenciaturaId}'),
      ),
      body: Center(
        child: disciplinas.isEmpty
            ? CircularProgressIndicator()
            : ListView.builder(
                itemCount: disciplinas.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(disciplinas[index]),
                  );
                },
              ),
      ),
    );
  }
}
