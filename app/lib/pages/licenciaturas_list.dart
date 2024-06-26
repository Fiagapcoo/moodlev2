import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'disciplinas_from_licenciatura.dart';

class LicenciaturasList extends StatefulWidget {
  const LicenciaturasList({Key? key}) : super(key: key);

  @override
  _LicenciaturasListState createState() => _LicenciaturasListState();
}

class _LicenciaturasListState extends State<LicenciaturasList> {
  List<String> licenciaturas = [];
  List<String> disciplinasID = [];

  @override
  void initState() {
    super.initState();
    fetchLicenciaturas();
  }

  Future<void> fetchLicenciaturas() async {
    try {
      final response = await http.get(Uri.parse(
          'https://4844-2001-818-ea57-fa00-ebba-b8f9-4987-8316.ngrok-free.app/licenciatura/getlicenciaturas'));
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        setState(() {
          licenciaturas = data
              .map((entry) => entry['Nome_licenciatura'].toString())
              .toList();
          disciplinasID =
              data.map((entry) => entry['ID_licenciatura'].toString()).toList();
        });
      } else {
        throw Exception('Failed to load licenciaturas');
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Licenciaturas List'),
        ),
        body: Center(
          child: licenciaturas.isEmpty
              ? const CircularProgressIndicator() // Show a loading indicator while fetching data
              : ListView.builder(
                  itemCount: licenciaturas.length,
                  itemBuilder: (context, index) {
                    return GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => DisciplinasFromLicenciatura(
                                licenciaturaId: int.parse(disciplinasID[index]),
                                licenciaturaName: licenciaturas[index]),
                          ),
                        );
                        print('Tapped ${licenciaturas[index]}');
                      },
                      child: ListTile(
                        title: Text(licenciaturas[index]),
                      ),
                    );
                  },
                ),
        ),
      ),
    );
  }
}
