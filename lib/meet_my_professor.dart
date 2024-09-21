import 'package:flutter/material.dart';

class Professor extends StatefulWidget {
  const Professor({super.key});

  @override
  State<Professor> createState() => _ProfessorState();
}

class _ProfessorState extends State<Professor> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Schedule an Appointment"),
        
      ),
    );
  }
}
