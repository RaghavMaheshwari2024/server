Delete election form db: 
npx prisma db execute --stdin << 'EOF'
DELETE FROM elections WHERE "electionId" = 'ELECTION_001';
EOF

