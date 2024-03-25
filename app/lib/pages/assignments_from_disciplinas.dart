import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AssignmentsFromDisciplinas extends StatefulWidget {
  final int disciplinaId;
  final String disciplinaName;

  const AssignmentsFromDisciplinas({Key? key, required this.disciplinaId, required this.disciplinaName}) : super(key: key);

  @override
  _AssignmentsFromDisciplinasState createState() => _AssignmentsFromDisciplinasState();
}

class _AssignmentsFromDisciplinasState extends State<AssignmentsFromDisciplinas> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Assignments for ${widget.disciplinaName}'),
      ),
      body: Center(
        child: FutureBuilder<List<dynamic>>(
          future: fetchAssignments(widget.disciplinaId),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const CircularProgressIndicator();
            } else if (snapshot.hasError) {
              return Text('Error: ${snapshot.error}');
            } else {
              return ListView.builder(
                itemCount: snapshot.data!.length,
                itemBuilder: (context, index) {
                  var assignment = snapshot.data![index];
                  return ListTile(
                    title: Text(assignment['Nome_assignment']),
                    subtitle: Text(assignment['DueDate']),
                    onTap: () {
                      // Navigate to assignment details page or perform any other action
                    },
                  );
                },
              );
            }
          },
        ),
      ),
    );
  }

  Future<List<dynamic>> fetchAssignments(int disciplinaId) async {
    final response = await http.get(Uri.parse('https://4844-2001-818-ea57-fa00-ebba-b8f9-4987-8316.ngrok-free.app/assignments/getassignmentsfromdisciplina?disciplina=$disciplinaId'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load assignments');
    }
  }
}
