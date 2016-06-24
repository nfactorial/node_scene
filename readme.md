PlayCanvas Session
==================
This module implements code for managing a simple session on the server.

Serialisation
=============
The current implementation of the serialisation framework output data
to a JSON string. This it not performant and not intended as
production ready. It is currently used during early development and
prototyping. Eventually this will be replaced with a binary format.
