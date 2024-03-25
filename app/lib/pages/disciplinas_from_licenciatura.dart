// ignore_for_file: library_private_types_in_public_api

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'assignments_from_disciplinas.dart';

class DisciplinasFromLicenciatura extends StatefulWidget {
  final int licenciaturaId;
  final String licenciaturaName;

  const DisciplinasFromLicenciatura({super.key, required this.licenciaturaId, required this.licenciaturaName});

  @override
  _DisciplinasFromLicenciaturaState createState() => _DisciplinasFromLicenciaturaState();
}

class _DisciplinasFromLicenciaturaState extends State<DisciplinasFromLicenciatura> {
  List<String> disciplinas = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchDisciplinas();
  }

  Future<void> fetchDisciplinas() async {
    try {
      final response = await http.get(Uri.parse('https://4844-2001-818-ea57-fa00-ebba-b8f9-4987-8316.ngrok-free.app/disciplina/getdisciplinafromlicenciatura?licenciatura=${widget.licenciaturaId}'));
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        setState(() {
          disciplinas = data.map((entry) => entry['Nome_disciplina'].toString()).toList();
          isLoading = false;
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
        title: Text(widget.licenciaturaName),
      ),
      body: Center(
        child: isLoading
            ? const CircularProgressIndicator()
            : disciplinas.isEmpty
                ? const Text('Ainda não existem disciplinas associadas a esta licenciatura.')
                : ListView.builder(
                    itemCount: disciplinas.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text(disciplinas[index]),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => AssignmentsFromDisciplinas(
                                disciplinaId: index + 1,
                                disciplinaName: disciplinas[index],
                              ),
                            ),
                          );
                        }
                      );
                    },
                  ),
      ),
    );
  }
}
